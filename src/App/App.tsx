import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./App.css";
import css from "./App.module.css";
import { fetchNotes } from "../services/noteService";
import type { FetchNotesResponse } from "../services/noteService";
// import type { NewTag, NoteTag } from "../types/note";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";

function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes({ search: "", page: 1, perPage: 12 }),
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {/* Компонент SearchBox */}
          {totalPages > 1 && (
            <Pagination
              countPage={totalPages}
              currentPage={page}
              onChangePage={(p) => setPage(p)}
            />
          )}
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>
      </div>
      {notes.length > 0 && !isLoading ? (
        <NoteList notes={notes} />
      ) : (
        <p>No notes found</p>
      )}
    </>
  );
}

export default App;
