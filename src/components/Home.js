import Homepage from "./Homepage";
import Notes from "./Notes";

export default function Home(props) {
  const { alert, showAlert } = props;

  return (
    <>
      {
        localStorage.getItem("token") ? (
          <Notes showAlert={showAlert} />
        ) : (
          <Homepage alert={alert} />
        )
      }
    </>
  );
}