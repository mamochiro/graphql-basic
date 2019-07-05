const Subsciption = {
  count:{
    subscription(parent , args , { pubsub } , info )  {
      let count = 0 

      setInterval( ()  => {
        count++
        pubsub.publish('count' , {
          count
        })
      } , 1000 )

      return pubsub.asyncIterator('count')
    }
  }
}

export { Subsciption as default }