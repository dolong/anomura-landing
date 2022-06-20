import { prisma } from "repositories/PrismaContext";




export default async function handler(req, res) {

    let svgString = "";
    let file = await fetch(path.join(process.cwd(), "/Tests/app.svg"));



    switch (req.method) {
        case "GET":

            return res.status(405).json({ message: "Method not allowed" });
        case "POST":
            const whiteListData = JSON.parse(req.body);

            const savedWhiteList = await prisma.whiteList.create({
                data: {
                    wallet: whiteListData.wallet,
                    discordID: whiteListData.discordID,
                }
            });
            return res.json(savedWhiteList);
        default:
            return res.status(405).json({ message: "Method not allowed" });
    }

};

