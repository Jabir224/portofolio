import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'

export async function fetchContent() {
  const snapshot = await getDocs(collection(db, 'content'))
  const content = {}

  snapshot.forEach((document) => {
    content[document.id] = document.data()
  })

  return content
}