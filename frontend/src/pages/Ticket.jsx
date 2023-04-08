import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { FaPlus } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { closeTicket, getTicket } from '../features/tickets/ticketSlice'
import { createNote, getNotes } from '../features/notes/notesSlice'
import BackButton from '../components/BackButton'
import NoteItem from '../components/NoteItem'
import Spinner from '../components/Spinner'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

const Ticket = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [noteText, setNoteText] = useState('')

  const { ticketId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { ticket, isLoading } = useSelector((state) => state.ticket)
  const { notes, loading } = useSelector((state) => state.notes)

  useEffect(() => {
    dispatch(getTicket(ticketId)).unwrap().catch(toast.error)
    dispatch(getNotes(ticketId)).unwrap().catch(toast.error)
  }, [dispatch, ticketId])

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
      .unwrap()
      .then(() => {
        toast.success('Ticket Closed')
        navigate('/tickets')
      })
      .catch(toast.error)
  }

  const openModal = () => {
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }

  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId }))
      .unwrap()
      .then(() => {
        setNoteText('')
        closeModal()
      })
      .catch(toast.error)
  }

  if (isLoading || loading) {
    return <Spinner />
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url={'/tickets'} />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted:{new Date(ticket.createdAt).toLocaleString()}</h3>
        <h3>Product:{ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== 'close' && (
        <button className='btn' onClick={openModal}>
          <FaPlus />
          Add Note
        </button>
      )}

      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='NoteText'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              cols='10'
              rows='2'
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes && notes.map((note) => <NoteItem key={note._id} note={note} />)}

      {ticket && ticket.status !== 'close' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
