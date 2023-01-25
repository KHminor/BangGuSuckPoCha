function Footer(): JSX.Element {
  return (
    <div>
      <footer className="bg-black " style={{ height: "5vh" }}>
        <div className="max-w-screen-xl px-4 pt-2 mx-auto sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <p className="mt-4 text-sm text-center text-gray-400 lg:text-right lg:mt-0">
              여기는 Footer 자리
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
