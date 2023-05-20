import { reqRoute } from "../utils/apiRoutes";
import { Note as noteModel } from "../model/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchNotes(): Promise<noteModel[]> {
  const response = await fetchData(reqRoute, { method: "GET" });
  return response.json();
}

//create a note
export interface noteBody {
  title: string;
  detail?: string;
}

export async function createNote(note: noteBody): Promise<noteModel> {
  const response = await fetchData(reqRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  return response.json();
}
