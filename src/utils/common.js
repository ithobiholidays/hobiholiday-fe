export function convertPrice(number) {
  if (typeof number !== "number") return null;

  // Convert to millions and format with one decimal place
  let formatted = (number / 1000000).toFixed(2);

  // Ensure dot is replaced with a comma
  formatted = formatted.replace(".", ",");

  // Remove ",0" at the end if exists
  if (formatted.endsWith(",0")) {
    formatted = formatted.slice(0, -2);
  } else {
    formatted = formatted.slice(0, -1);
  }

  return formatted;
}

export function convertRupiah(number) {
  if (typeof number !== "number") return null;

  let formatted = (number / 1000000).toFixed(1).replace(".", ",");

  // Remove ",0" if it exists at the end
  return formatted.endsWith(",0") ? formatted.slice(0, -2) : formatted;
}

export function formatIDR(amount) {
  amount = parseInt(amount);

  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
}

export async function downloadFileFromUrl(fileUrl, name) {
  if (!fileUrl) {
    console.error("No file URL provided");
    return;
  }

  const validExtensions = ["doc", "docx", "pdf"];
  const urlParts = fileUrl.split("/");
  const fileName = urlParts[urlParts.length - 1];
  const fileExtension = fileName.split(".").pop().toLowerCase();

  if (!validExtensions.includes(fileExtension)) {
    console.error(
      "Invalid file format. Only .doc, .docx, and .pdf are allowed."
    );
    return;
  }

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}
