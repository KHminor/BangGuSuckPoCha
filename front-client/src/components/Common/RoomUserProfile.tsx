const RoomUserProfile = () => {
  return (
    <div className={`bg-black bg-opacity-90 fixed w-full h-full text-white`}>
      <div
        className={`min-w-[40rem] bg-black w-1/3 h-3/4 px-16 py-10 rounded-3xl relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        <div className={`w-full h-2/6 border`}></div>
        <div className={`w-full h-1/6 border`}></div>
        <div className={`w-full h-1/6 border`}></div>
        <div className={`flex h-1/6 justify-evenly`}>
          <div className={`w-1/4 h-full border`}></div>
          <div className={`w-1/4 h-full border`}></div>
          <div className={`w-1/4 h-full border`}></div>
          <div className={`w-1/4 h-full border`}></div>
        </div>
        <div className={`flex h-1/6 justify-evenly`}>
          <div className={`w-1/3 h-full border`}></div>
          <div className={`w-1/3 h-full border`}></div>
          <div className={`w-1/3 h-full border`}></div>
        </div>
      </div>
    </div>
  );
};

export default RoomUserProfile;
