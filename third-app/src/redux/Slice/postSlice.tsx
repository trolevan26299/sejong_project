import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../component/types';

interface IInitialState {
  product?: Product[] | null;
  singleProduct?: Product | null;
  total: number;
  infoHTML: boolean;
  loadDing: boolean;
}

const initialState: IInitialState = {
  product: [],
  singleProduct: null,
  total: 0,
  infoHTML: true,
  loadDing: false,
};

export const postSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    setInfoHTML: (state, { payload }: PayloadAction<{ infoHTML: boolean }>) => {
      state.infoHTML = payload.infoHTML;
    },
    setIsLoading: (
      state,
      { payload }: PayloadAction<{ loadDing: boolean }>,
    ) => {
      state.loadDing = payload.loadDing;
    },
    getProducts: (
      state,
      { payload }: PayloadAction<{ product: Product[] }>,
    ) => {
      state.product = payload.product;
      state.loadDing = true;
    },
    getTotalProducts: (
      state,
      { payload }: PayloadAction<{ total: number }>,
    ) => {
      state.total = payload.total;
    },
    createProduct: (
      state,
      { payload }: PayloadAction<{ product: Product }>,
    ) => {
      state.product?.unshift(payload.product);
    },
    getProductById: (
      state,
      { payload }: PayloadAction<{ singleProduct: Product | null }>,
    ) => {
      state.singleProduct = payload.singleProduct;
    },
    updateProductById: (
      state,
      { payload }: PayloadAction<{ product: Product }>,
    ) => {
      state.loadDing = true;
      const { id } = payload.product;
      const index = state.product?.findIndex((x) => x.id === id);
      if (
        state.product !== null &&
        state.product !== undefined &&
        index !== undefined
      ) {
        state.product[index] = payload.product;
      }
    },
    deleteProductById: (
      state,
      { payload }: PayloadAction<{ product: Product }>,
    ) => {
      const { id } = payload.product;
      const index = state.product?.findIndex((x) => x.id === id);
      if (
        state.product !== null &&
        state.product !== undefined &&
        index !== undefined
      ) {
        state.product.splice(index, 1);
      }
    },
  },
});

export const {
  getProducts,
  getTotalProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  setInfoHTML,
  setIsLoading,
} = postSlice.actions;

export default postSlice.reducer;
