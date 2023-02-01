function AlarmReview():JSX.Element {
  return (
    <div className="grid h-full w-full" style={{gridTemplateRows: '0.8fr 1fr 4fr 0.2fr' }}>
        <div className="border-2 border-red-300">1</div>
        <div className="border-2 border-green-300">2</div>
        <div className="border-2 border-blue-300">3</div>
        <div className="border-2 border-yellow-300">4</div>
      </div>
  )
}
export default AlarmReview