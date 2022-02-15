import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// this is for server side rendering test
export default async function crabsQuery(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            try { 
                let testCrabs = [
                    {
                        "crabId": 0,
                        "background": "science_lab",
                        "shell": "wood_carnivora",
                        "legs": "Reinforced snow_1",
                        "claws": "Indestructible metal_lasergun",
                        "body": "wood_beastman"
                    },
                    {
                        "crabId": 7,
                        "background": "ocean_abysbioluminescence",
                        "shell": "Graceful metal_alembic",
                        "legs": "Majestic snow_1",
                        "claws": "wood_hammerlogs",
                        "body": "metal_golden"
                    },
                    {
                        "crabId": 5,
                        "background": "ocean_abysbioluminescence",
                        "shell": "wood_carnivora",
                        "legs": "wood_3",
                        "claws": "Reinforced snow_icycle",
                        "body": "partner_kongz"
                    },
                    {
                        "crabId": 3,
                        "background": "extras_vietnam",
                        "shell": "partner_kongz",
                        "legs": "snow_1",
                        "claws": "wood_hammerlogs",
                        "body": "partner_kongz"
                    },
                    {
                        "crabId": 8,
                        "background": "science_lab",
                        "shell": "Majestic metal_alembic",
                        "legs": "snow_1",
                        "claws": "Indestructible snow_icycle",
                        "body": "Graceful partner_kongz"
                    },
                    {
                        "crabId": 1,
                        "background": "Secret ocean_abysbioluminescence",
                        "shell": "partner_kongz",
                        "legs": "snow_1",
                        "claws": "Graceful wood_hammerlogs",
                        "body": "Majestic partner_kongz"
                    },
                    {
                        "crabId": 4,
                        "background": "extras_vietnam",
                        "shell": "Indestructible partner_kongz",
                        "legs": "Indestructible wood_3",
                        "claws": "snow_icycle",
                        "body": "partner_kongz"
                    },
                    {
                        "crabId": 6,
                        "background": "science_lab",
                        "shell": "metal_alembic",
                        "legs": "Majestic snow_1",
                        "claws": "snow_icycle",
                        "body": "partner_kongz"
                    },
                    {
                        "crabId": 2,
                        "background": "science_lab",
                        "shell": "Majestic partner_kongz",
                        "legs": "Indestructible wood_3",
                        "claws": "wood_hammerlogs",
                        "body": "metal_golden"
                    }
                ]
                res.status(200).json(testCrabs);
            } catch (err) {
                console.log(err);
                res.status(500).json({ err });
            }

            break;

        default:
            res.setHeader("Allow", ["GET", "PUT"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
