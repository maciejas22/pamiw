import prisma from '../utils/prisma'

const AUTHORS_SEED = [
  { name: 'J. K. Rowling' },
  { name: 'J. R. R. Tolkien' },
  { name: 'Brent Weeks' },
  { name: 'Patrick Rothfuss' },
  { name: 'Brandon Sanderson' },
]

const BOOKS_SEED = [
  { title: "Harry Potter and the Sorcerer's Stone", authorIndex: 0 },
  { title: 'The Hobbit', authorIndex: 1 },
  { title: 'The Way of Shadows', authorIndex: 2 },
  { title: 'The Name of the Wind', authorIndex: 3 },
  { title: 'Mistborn: The Final Empire', authorIndex: 4 },
]

async function clear() {
  await prisma.book.deleteMany({})
  await prisma.author.deleteMany({})
}

async function seed() {
  await clear()

  const authors = await Promise.all(
    AUTHORS_SEED.map((author) => prisma.author.create({ data: author })),
  )

  const books = await Promise.all(
    BOOKS_SEED.map((book) => {
      const { title, authorIndex } = book
      return prisma.book.create({
        data: {
          title,
          authorId: authors[authorIndex].id,
        },
      })
    }),
  )
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
