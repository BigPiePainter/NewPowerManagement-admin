import http from '@/libs/http'

export const getProduct = (data: object) => {
  const args = {
    url: '/api/management/product/page-products',
    method: 'GET',
    params: data
  }
  return http.request(args)
}

export const getAllPackages = (data: object) => {
  const args = {
    url: '/api/management/product/all-package',
    method: 'GET',
    params: data
  }
  return http.request(args)
}

export const createProduct = (data: any) => {
  const args = {
    url: '/api/management/product/create-product',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const editProduct = (data: any) => {
  const args = {
    url: '/api/management/product/edit-product',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const deleteProductContent = (data: any) => {
  const args = {
    url: '/api/management/product/content/delete-content',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const deleteProduct = (data: any) => {
  const args = {
    url: '/api/management/product/delete-product',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const getProductContent = (data: any) => {
  const args = {
    url: '/api/management/product/content/page-content',
    method: 'get',
    params: data
  }
  return http.request(args)
}

export const addProduct = (data: any) => {
  const args = {
    url: '/api/management/product/content/create-content',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}