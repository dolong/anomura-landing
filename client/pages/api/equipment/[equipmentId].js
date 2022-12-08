import { getEquipment } from "@repositories/equipment";
import { getAnomuraById } from "repositories/crabs";
import { ethers } from "ethers"

const collectionAddress = ethers.utils.getAddress(NEXT_PUBLIC_EQUIPMENT_ADDRESS)
const equipmentQueryHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        let equipmentId = parseInt(req.query.equipmentId);
        let equipment = await getEquipment(collectionAddress, equipmentId);

        if (equipment) {
          if (equipment.isReveal) {
            res.setHeader('Cache-Control', 'max-age=0, s-maxage=172800, stale-while-revalidate');
            res.status(200).json({
              name: equipment.equipmentName,
              description: "Equipment Description TBD",
              animation_url: `${process.env.NEXT_PUBLIC_WEBSITE_HOST}/imageviewer/equipment/${equipmentId}`,
              image: equipment.image,
              attributes: [
                {
                  trait_type: "Equipment Type",
                  value: equipment.equipmentType,
                },
                {
                  trait_type: "Equipment Rarity",
                  value: equipment.equipmentRarity,
                },
              ],
            });
          } else {
            res.status(200).json({
              name: "A Mystery Rune of DeepSea",
              image: "https://res.cloudinary.com/deepsea/image/upload/v1670088118/Anomura-Web-Assets/Rune-Stone_cfnm3u.gif",
              attributes: [
                {
                  trait_type: "Equipment Type",
                  value: "Undeterminable",
                },
                {
                  trait_type: "Equipment Rarity",
                  value: "Undeterminable",
                },
              ],
            });
          }

        } else {
          res.status(200).json({
            name: `Crab ${id}`,
            description: "Unminted crab",
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
      }

      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
export default equipmentQueryHandler