import { getAnomuraById, createAnomura, updateCrabById } from "repositories/crabs";
import { CrabImagesBuilder } from "utils/crabImagesBuilder2";
import authMiddleware from "middlewares/authMiddleware";
import { getAnomuraName } from "@utils/getAnomuraName";
import { getAnomuraDescription } from "@utils/getAnomuraDescription";

const CrabImageViewerUpdate = async (req, res) => {

    try {
        const {
            data: { background, body, legs, claws, shell, headpieces },
        } = req.body;

        console.log(`Building an anomura...`);
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

        let anomuraName = getAnomuraName();
        let anomuraDescription = getAnomuraDescription();
        if (existingCrab) {
            console.log(`Found existing anomura ${crabId}, image: ${existingCrab.image} `);
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
            console.log(`No need to update anomura Image`);
            return res.status(200).json({ data: {}, message: "No need to update anomura Image" });

        }
        else {
            let newCrab = await createAnomura({
                crabId,
                background,
                body,
                legs,
                claws,
                shell,
                image: crabImage,
                headpieces,
                name: anomuraName,
                description: anomuraDescription
            });
            console.log(`A new anomura ${crabId} is created`);
            res.status(200).json({ data: newCrab });
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}

export default authMiddleware(CrabImageViewerUpdate)