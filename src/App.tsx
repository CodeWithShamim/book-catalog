import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { setLoading, setUser } from "./redux/features/user/userSlice";
import Loading from "./components/Loading";

function App() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
      }
      dispatch(setLoading(false));
    });
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return <MainLayout />;
}

export default App;
