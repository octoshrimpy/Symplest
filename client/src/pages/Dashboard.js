import {useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NoteForm from '../components/forms/NoteForm';
import { getNotes } from '../features/notes/noteSlice';
import { reset } from '../features/auth/authSlice';

export default function Dashboard () {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)
    const {notes, isLoading, isError, message} = useSelector((state) => state.notes)

    useEffect(() => {
      if(isError) {
        console.log(message)
      }

      if(!user) {
        navigate('/login')
      }

      dispatch(getNotes())

      return () => {
        dispatch(reset())
      }
    }, [user, navigate, isError, message, dispatch])

    if(isLoading) {
      return <Spinner />
    }

    return (
        <div>
            <Navbar />
            <div style={{
              maxWidth: 500,
              margin: 'auto',
              marginTop: '5rem'
            }}
            >
              <h1>Dashboard</h1>
              <NoteForm />
            </div>

            <Footer />
        </div>
    )
}