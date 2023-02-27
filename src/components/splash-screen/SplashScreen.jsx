import HashLoader from "react-spinners/HashLoader";

const SplashScreen = ({ setShowSplash }) => {
  setTimeout(() => {
    setShowSplash(false);
  }, 1000);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HashLoader
        color={"#1d4ed8"}
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default SplashScreen;
