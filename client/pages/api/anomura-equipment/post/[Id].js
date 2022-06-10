import { createEquipment, getAllAnomuraPartImages, getAnomuraEquipmentById, getAnomuraPartImageByName, updateAnomuraEquipmentImageById } from "repositories/anomura-equipment";

import authMiddleware from "middlewares/authMiddleware";

// update / create equipment image
const EquipmentImageViewerUpdate = async (req, res) => {

    try {
        const {
            data: { name, equipmentType },
        } = req.body;
        console.log(
            `Building an anomura equipment...`
        );
        const equipmentId = parseInt(req.query.Id);
        const anomuraPartImages = await getAllAnomuraPartImages()
        let index = anomuraPartImages.findIndex(part => name.includes(part.name))

        if (index === -1) {
            return res.status(200).json({ message: "cannot find image", isError: true });
        }
        // then use the image to save into AnomuraEquipment table
        const anomuraEquipment = await getAnomuraEquipmentById(equipmentId)
        if (anomuraEquipment) {
            console.log(
                `Updating existing equipment with image...`
            );
            if (anomuraEquipment.image !== anomuraPartImages[index].url) {

                await updateAnomuraEquipmentImageById({
                    equipmentId,
                    image: anomuraPartImages[index].url
                });
            }
            return res.status(200).json({ message: "ok" });
        }
        else {
            await createEquipment({
                equipmentId,
                name,
                equipmentType: parseInt(equipmentType),
                image: anomuraPartImages[index].url
            });
            console.log(`A new equipment ${equipmentId} is created`);
            return res.status(200).json({ message: "ok" });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
}

export default authMiddleware(EquipmentImageViewerUpdate)