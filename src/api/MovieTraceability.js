import request from '@/utils/request'

export function GetTraceabilityComment(currentPage, pageSize) {
  return request({
    url: 'http://47.102.195.143:6001/traceability/comment',
    method: 'get',
    params: {
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export function GetTraceabilityMovieTvAsin(currentPage, pageSize) {
  return request({
    url: 'http://47.102.195.143:6001/traceability/movieTVAsin',
    method: 'get',
    params: {
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export function GetTraceabilityMissingAsin(currentPage, pageSize) {
  return request({
    url: 'http://47.102.195.143:6001/traceability/missingAsin',
    method: 'get',
    params: {
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export function GetTraceabilityMovie(currentPage, pageSize) {
  return request({
    url: 'http://47.102.195.143:6001/traceability/movie',
    method: 'get',
    params: {
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export function GetActorByMovieConflict(currentPage, pageSize) {
  return request({
    url: 'http://47.102.195.143:6001/traceability/consolidationMovie/conflict',
    method: 'get',
    params: {
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export function GetActorByMovieNoConflict(currentPage, pageSize) {
  return request({
    url: 'http://47.102.195.143:6001/traceability/consolidationMovie/no-conflict',
    method: 'get',
    params: {
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export function GetTraceabilityTvAsin(currentPage, pageSize) {
  return request({
    url: 'http://47.102.195.143:6001/traceability/tvAsin',
    method: 'get',
    params: {
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}

export function GetTraceabilityTotalCount() {
  return request({
    url: 'http://47.102.195.143:6001/traceability/totalCount',
    method: 'get',
  })
}

export function GetTraceabilitySearchingMovie(currentPage, pageSize, title) {
  return request({
    url: 'http://47.102.195.143:6001/traceability/searchingMovie',
    method: 'get',
    params: {
      currentPage: currentPage,
      pageSize: pageSize,
      title: title
    }
  })
}

export function GetTraceabilityConflictInfo(movieAsin) {
  return request({
    url: 'http://47.102.195.143:6001/traceability/conflictInfo',
    method: 'get',
    params: {
      movieAsin: movieAsin
    }
  })
}






