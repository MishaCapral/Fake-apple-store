import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItems } from '../../api/getItems';
import {
  ActiveModelType,
  ActiveOptionType,
} from '../../components/infoToggle/InfoToggle';
import { RootState } from '../store';

export type ActiveVariantsType = {
  optionIndex: number;
  modelIndex: number;
};

type OptionType = {
  option: string;
  price: number;
};

export type TypeItemType = {
  model: string;
  options: OptionType[];
};

export interface ItemInterface {
  category: string;
  description: string;
  id: string;
  img: string;
  minPrice: number;
  title: string;
  activeVariants: ActiveVariantsType;
  type: TypeItemType[];
}
enum StatusFetching {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface ItemsSliceInterface {
  items: ItemInterface[];
  status: StatusFetching;
}

const initialState: ItemsSliceInterface = {
  items: [],
  status: StatusFetching.LOADING,
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,

  reducers: {
    setItem: (state, action: PayloadAction<ItemInterface[]>) => {
      state.items = action.payload;
    },
    setActiveModel: (state, action: PayloadAction<ActiveModelType>) => {
      const existingItems = JSON.parse(JSON.stringify(state.items));
      const item = existingItems.find(
        (state) => state.id === action.payload.id,
      );
      item.activeVariants.modelIndex = action.payload.newModelIndex;
      state.items = existingItems;
    },
    setActiveOption: (state, action: PayloadAction<ActiveOptionType>) => {
      const existingItems = JSON.parse(JSON.stringify(state.items));
      const item = existingItems.find(
        (state) => state.id === action.payload.id,
      );
      item.activeVariants.optionIndex = action.payload.newOptionIndex;
      state.items = existingItems;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.status = StatusFetching.LOADING;
      state.items = [];
    });

    builder.addCase(getItems.fulfilled, (state, action) => {
      state.status = StatusFetching.SUCCESS;
      state.items = action.payload;
    });

    builder.addCase(getItems.rejected, (state) => {
      state.status = StatusFetching.ERROR;
      state.items = [];
    });
  },
});

export const selectItems = (state: RootState) => state.items;
export const { setItem, setActiveModel, setActiveOption } = itemsSlice.actions;

export default itemsSlice.reducer;
