import React from 'react'
import { useParams } from 'react-router-dom';

const Channel = () => {
  let { channelId } = useParams();

  return (
    <h1>
      Channel : {channelId}
    </h1>
  )
}

export default Channel
