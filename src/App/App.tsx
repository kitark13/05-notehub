import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./App.css";
import css from "./App.module.css";
import { fetchNotes } from "../services/noteService";
import type { FetchNotesResponse } from "../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";

function App() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes({ search: debouncedSearch, page, perPage: 12 }),
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={search} onChange={handleSearchChange} />

          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </header>
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <NoteForm
            onSuccess={() => {
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
      {notes.length > 0 && !isLoading ? (
        <NoteList notes={notes} />
      ) : (
        <p>No notes found</p>
      )}

      {totalPages > 1 && (
        <Pagination
          countPage={totalPages}
          currentPage={page}
          onChangePage={(p) => setPage(p)}
        />
      )}
    </>
  );
}

export default App;
