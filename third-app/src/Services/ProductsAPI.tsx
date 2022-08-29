import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { Filter, Product } from '../component/types';
import {
  getProducts,
  getTotalProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} from '../redux/Slice/postSlice';
import axiosClient from './AxiosClient';

export function postSlice(params?: Filter) {
  const url = '/posts';
  return async (dispatch: any) => {
    axiosClient
      .get<Filter, AxiosResponse<Filter, Filter>, Filter>(url, { params })
      .then((response: any) => {
        dispatch(getProducts({ product: response }));
      });
  };
}

export function fetchTotalProducts(params?: Filter) {
  const url = '/posts';
  return async (dispatch: Dispatch) => {
    axiosClient
      .get<Filter, AxiosResponse<Filter, Filter>, Filter>(url, { params })
      .then((response: any) => {
        dispatch(getTotalProducts({ total: response.length }));
      });
  };
}

export function createByFormSubmit(product?: Product) {
  const url = '/posts';
  return async (dispatch: Dispatch) => {
    axiosClient
      .post<Product, AxiosResponse<Product>, Product>(url, product)
      .then((response: any) => {
        dispatch(createProduct({ product: response }));
      });
  };
}

export function postSliceById(id: number) {
  const url = `/posts/${id}`;
  return async (dispatch: Dispatch) => {
    axiosClient
      .get<number, AxiosResponse<number>, number>(url)
      .then((response: any) => {
        dispatch(
          getProductById({
            singleProduct: { ...response, viewCnt: response.viewCnt + 1 },
          }),
        );
      });
  };
}

export function updateById(id?: number, product?: Product) {
  const url = `/posts/${id}`;
  return async (dispatch: Dispatch) => {
    axiosClient
      .patch<Product, AxiosResponse<Product>, Product>(url, product)
      .then((response: any) => {
        dispatch(updateProductById({ product: response }));
      });
  };
}

export function postSliceNullId(id: any) {
  return async (dispatch: Dispatch) => {
    dispatch(
      getProductById({
        singleProduct: id,
      }),
    );
  };
}

export function deleteProductId(id: number, product: Product) {
  const url = `/posts/${id}`;
  return async (dispatch: Dispatch) => {
    axiosClient
      .delete<Product, AxiosResponse<Product>, Product>(url)
      .then(() => {
        dispatch(deleteProductById({ product: product }));
      });
  };
}
