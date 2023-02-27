import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function ProjectDescription({}) {
  return (
    <Paper sx={{ margin: "1rem", padding: "2rem" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", padding: "1rem" }}>
        NordStone
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
        The web application developed using a combination of technologies,
        including ReactJS, React Router DOM, Context API, Firebase, and MUI. The
        app boasts of four different routes, each designed to offer unique
        features and functionalities. The first component of the app allows
        users to upload and replace their photos using a camera or through file
        upload. The images are then saved securely to Firebase storage, ensuring
        their safety and availability to the user whenever they need them. The
        second component of the app enables users to write text and save it to
        Firestore. The third component of the app allows users to send push
        notifications to their devices by simply clicking a button. The fourth
        component of the app is a calculator that uses a backend API to perform
        basic operations.Axios is used to fetch the computed result. In addition
        to the four components, the app also has sign up, login, and reset
        password pages designed using Firebase. These features ensure the safety
        and security of user data and enhance user experience. The app also
        features protected routes, and the user state is managed using Context
        API. This technology ensures that only authorized users can access the
        app's features, providing a secure and personalized experience for each
        user.
      </Typography>
    </Paper>
  );
}

export default ProjectDescription;
