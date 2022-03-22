import { getAllCrabs } from "../../../repositories/crabs";

export default async function crabsQuery(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const currentPage = req.query.page;

                let allCrabs = await prisma.anomuras.findMany({
                    skip: currentPage * 100,
                    take: 100,
                    orderBy: [
                        {
                            crabId: "asc",
                        },
                    ],
                });
                res.status(200).json(allCrabs);
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
