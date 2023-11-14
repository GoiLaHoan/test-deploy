type Func = (uuid: string, thumbnailUuid: string) => string;

const videoImageString: Func = (uuid, thumbUuid) => {
  const storage = "https://storage.googleapis.com/kitco-video-dev";
  return `${storage}/${uuid}/${thumbUuid}.jpeg`;
};

export default videoImageString;
