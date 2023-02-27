import { useState, useEffect, useContext } from "react";
import { Button, Container, TextareaAutosize, Typography } from "@mui/material";
import { UserContext } from "../../context/userContext";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { toast } from "react-toastify";

const WritePost = () => {
  const { user } = useContext(UserContext);
  const [text, setText] = useState("");
  const [savedTexts, setSavedTexts] = useState([]);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSaveClick = async () => {
    try {
      const docRef = doc(db, "users", user.uid);

      await updateDoc(docRef, {
        texts: arrayUnion({ text, id: Date.now() }),
      });
      setText("");
      toast.success("Text added successfully!");
      fetchTexts();
    } catch (error) {
      toast.error("Could not add text");
      console.log(error);
    }
  };

  const fetchTexts = async () => {
    const ref = doc(db, "users", user.uid);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setSavedTexts(data.texts);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ marginTop: "4rem" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Add Text
      </Typography>
      <TextareaAutosize
        aria-label="textarea"
        placeholder="Enter some text..."
        value={text}
        onChange={handleTextChange}
        style={{
          width: "100%",
          minHeight: "200px",
          marginBottom: "16px",
          padding: "1rem",
        }}
      />
      <Button variant="contained" onClick={handleSaveClick}>
        Save Text
      </Button>
      {savedTexts.length
        ? savedTexts.map((savedText) => {
            return (
              <Typography sx={{ marginTop: "20px" }} key={savedText.id}>
                {savedText.text}
              </Typography>
            );
          })
        : ""}
    </Container>
  );
};

export default WritePost;
