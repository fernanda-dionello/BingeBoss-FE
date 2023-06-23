import "./ContentBasicInfo.css";

export function ContentBasicInfo(props) {
  return (
    props.channels && props.channels.map((item, index) => 
      <img key="index" src={`https://image.tmdb.org/t/p/w92/${item?.logo_path}`} alt='channel logo' />
    )
  );
}
