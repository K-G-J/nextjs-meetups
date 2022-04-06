import { MongoClient } from 'mongodb'
import Head from 'next/head'
import { Fragment } from 'react'
import MeetupList from '../components/meetups/MeetupList'

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='descriptions'
          content = 'Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
    )
}

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://KateJohnson:mRyYzWEntwutOQqv@cluster0.zrrsl.mongodb.net/meetups?retryWrites=true&w=majority',
  )
  const db = client.db()

  const meetupsCollection = db.collection('meetups')

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  // return props object
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        addres: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 1,
  }
}
