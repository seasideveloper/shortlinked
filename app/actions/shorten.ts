'use server';

import { setApiKey, createLink } from "@short.io/client-node";
import { generateQrCode } from "@short.io/client-node";

// Initialize SDK with your private key
setApiKey(process.env.SHORT_IO_API_KEY || "");

export async function shortenUrlAction(longUrl: string) {

  try {
    const domain = process.env.SHORT_IO_DOMAIN || "";
    
    // Call the Short.io SDK method
    const result = await createLink({
      body: {
        originalURL: longUrl,
        domain: domain,
      }
    });

    const linkID = result.data?.id;
    const stringLinkID = String(linkID)

    const qrCode = await generateQrCode({
        path: { linkIdString: stringLinkID},
        body: {
            size: 99,
            type: "png",  // or "svg",
            useDomainSettings: true
      }
    });

    // 1. Get the raw Blob from the response data
    const blob : any = qrCode.data;

  // 2. Convert the Blob into an ArrayBuffer, then into a Node.js Buffer
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

  // 3. Convert the Buffer into a Base64 text string
    const base64String = buffer.toString('base64');

    // Return the generated short URL string back to the client
    return { success: true, shortURL: result.data?.shortURL, mimeType: "image/png", base64Data: base64String};
  } catch (error: any) {
    console.error("Short.io Error:", error);
    return { success: false, error: error.message || "Failed to shorten link" };
  }
}