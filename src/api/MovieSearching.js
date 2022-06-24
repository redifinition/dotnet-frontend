import request from '@/utils/request'

export function fuzzySearchMoviename(movieName) {
  if (typeof movieName !== 'string') {
    movieName = movieName.value
  }
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/movie',
    method: 'get',
    params: {
      'movieName': movieName
    }
  })
}

export function fuzzySearchMovieCategory(movieCategory) {
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/category',
    method: 'get',
    params: {
      'category': movieCategory
    }
  })
}

export function fuzzySearchMovieDirector(director) {
  if (typeof director !== 'string') {
    director = director.value
  }
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/director',
    method: 'get',
    params: {
      'directorName': director
    }
  })
}

export function fuzzySearchMainActor(actor) {
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/actor',
    method: 'get',
    params: {
      'actorName': actor
    }
  })
}

export function SearchMovieByMysql(data) {
  if (data.minScore) { data.minScore = data.minScore.toString() }
  if (data.maxScore) { data.maxScore = data.maxScore.toString() }
  console.log(data)
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/movie/result',
    method: 'post',
    data: data
  })
}

export function SearchMovieByNeo4j(data) {
  return request({
    url: 'http://47.102.195.143:6001/neo4j/movie',
    method: 'post',
    data: data
  })
}

export function GetDirectorByAsin(movieAsin, Index) {
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/movie/director',
    method: 'get',
    params: {
      'movieAsin': movieAsin,
      'Index': Index
    }
  })
}

export function GetMainActorByAsin(movieAsin, Index) {
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/movie/mainActor',
    method: 'get',
    params: {
      'movieAsin': movieAsin,
      'Index': Index
    }
  })
}

export function GetActorsByMovieAsin(movieAsin, Index) {
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/movie/actor',
    method: 'get',
    params: {
      'movieAsin': movieAsin,
      'Index': Index
    }
  })
}

export function GetActorAndDirector() {
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/actor/director/cooperation',
    method: 'get'
  })
}

