import http from '@/libs/http'

export const getBanners = () => {
  const args = {
    url: '/api/management/banner/get-all-banners',
    method: 'GET',
  }
  return http.request(args)
}

export const createBanner = (data: any) => {
  const args = {
    url: '/api/management/banner/create-banner',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}

export const deleteBanner = (data: any) => {
  const args = {
    url: '/api/management/banner/delete-banner',
    method: 'POST',
    data,
    mode: "json"
  }
  return http.request(args)
}