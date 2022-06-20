import { getAnomuraById, createCrab, updateCrabById } from "repositories/crabs";
import { CrabImagesBuilder } from "utils/crabImagesBuilder";
import authMiddleware from "middlewares/authMiddleware";

const CrabImageViewerUpdate = async (req, res) => {

    try {
        const {
            data: { background, body, legs, claws, shell, headpieces },
        } = req.body;

        console.log(
            `Building an anomura...`
        );
        const crabId = parseInt(req.query.crabId);
        const existingCrab = await getAnomuraById(crabId);

        let crabImage = await CrabImagesBuilder({
            crabId,
            background,
            body,
            legs,
            claws,
            shell,
            headpieces,
        })

        if (existingCrab) {
            console.log(
                `Found existing crab ${crabId} with id: ${existingCrab.id}, image: ${existingCrab.image} updating...`
            );
            if (existingCrab.image != crabImage) {
                let crabId = existingCrab.id;
                const updatedCrab = await updateCrabById({
                    crabId,
                    image: crabImage,
                    background,
                    body,
                    legs,
                    claws,
                    shell,
                    headpieces,
                });
                console.log(`Updated anomura attrs successfully`);
                res.status(200).json({ data: "Updated anomura attrs successfully" });
                return;
            }
            console.log(`No need to update crab Image`);
            return res.status(200).json({ data: {}, message: "No need to update crab Image" });

        }
        else {
            let newCrab = await createCrab({
                crabId,
                background,
                body,
                legs,
                claws,
                shell,
                image: crabImage,
                headpieces,
            });
            console.log(`A new crab ${crabId} is created`);
            res.status(200).json({ data: newCrab });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}

export default authMiddleware(CrabImageViewerUpdate)