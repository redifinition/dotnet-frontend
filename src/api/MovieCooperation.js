import request from '@/utils/request'

export function GetMaxCooperationActor(movieName) {
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/actor/cooperation',
    method: 'get'
  })
}

export function GetActorAndDirector(actorName, directorName) {
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/movie/actorAndDirector',
    method: 'get',
    params: {
      actorName: actorName,
      directorName: directorName
    }

  })
}

export function GetActorAndDirectorOfNeo4j() {
  return request({
    url: 'http://47.102.195.143:6001/neo4j/relation/actorAndDirector',
    method: 'get'
  })
}

export function GetActorsOfNeo4j() {
  return request({
    url: 'http://47.102.195.143:6001/neo4j/relation/actors',
    method: 'get'
  })
}

export function GetRelationsofActorsMysql(actor1,actor2) {
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/movie/actors',
    method: 'get',
    params: {
      actor1: actor1,
      actor2: actor2
    }
  })
}

export function GetDirectorsByMovieAsinAndIndex(movieAsin, Index) {
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/movie/director',
    method: 'get',
    params: {
      movieAsin: movieAsin,
      Index: Index
    }
  })
}

export function GetMainActorByMovieAsinAndIndex(movieAsin, Index) {
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/movie/mainActor',
    method: 'get',
    params: {
      movieAsin: movieAsin,
      Index: Index
    }
  })
}

export function GetActorByMovieAsinAndIndex(movieAsin, Index) {
  return request({
    url: 'http://47.102.195.143:6001/mysql/association/movie/actor',
    method: 'get',
    params: {
      movieAsin: movieAsin,
      Index: Index
    }
  })
}



