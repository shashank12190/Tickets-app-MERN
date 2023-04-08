import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import TicketItem from '../components/TicketItem'
import { getTickets } from '../features/tickets/ticketSlice'

const Tickets = () => {
  const { tickets, loading } = useSelector((state) => state.ticket)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets &&
          tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
      </div>
    </>
  )
}

export default Tickets
