import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function saveWhiteList(whiteList) {
    const response = await fetch("/api/dataCRUD",
        {
            method: "POST",
            body: JSON.stringify(whiteList)
        });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

//Need to create a hook for connecting your wallet.


export default function index({ whiteList }) {

    let formData = {
        wallet: "",
        discordID: "",
    }

    return (
        <div>

        </div>
    );
}

export async function getServerSideProps() {
    //We might need to change this down the line where prisma just find the current metamask if the user is already logged in to metamask
    const whiteList = await prisma.whiteList.findMany();
    return {
        props: {
            whiteList
        }
    }
}