import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            name: "Jhon Doe",
            email: "jhon.doe",
            avatarUrl: "https://github.com/Muglly.png",
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: "Exemple Pool",
            code: "BOL123",
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: "2022-11-07T12:00:00.025Z",
            firstTeamCountryCode: "DE",
            secondTeamCountryCode: "BR"
        }
    })

    await prisma.game.create({
        data: {
            date: "2022-11-18T12:00:00.025Z",
            firstTeamCountryCode: "US",
            secondTeamCountryCode: "JP"
        }
    })

    await prisma.game.create({
        data: {
            date: "2022-11-08T12:00:00.025Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "PT"
        }
    })

    await prisma.game.create({
        data: {
            date: "2022-11-11T12:00:00.025Z",
            firstTeamCountryCode: "CA",
            secondTeamCountryCode: "FR"
        }
    })

    await prisma.game.create({
        data: {
            date: "2022-11-11T12:00:00.025Z",
            firstTeamCountryCode: "FR",
            secondTeamCountryCode: "DE"
        }
    })

    await prisma.game.create({
        data: {
            date: "2022-11-08T12:00:00.025Z",
            firstTeamCountryCode: "BR",
            secondTeamCountryCode: "AR",

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })
}

main()