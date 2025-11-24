'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "../components/button";

type Combo = {
  id: number;
  title: string;
  notation: string;
  date: string;
};

export default function Home() {
  const [combos, setCombos] = useState<Combo[]>([]);

  const loadCombos = () => {
    const saved = localStorage.getItem("combos");
    if (saved) {
      setCombos(JSON.parse(saved));
    }
    else {
      setCombos([]);
    }
  };

  const handleDelete = (id: number) => {
    const filteredCombos = combos.filter((combo) => combo.id !== id);
    setCombos(filteredCombos);
    localStorage.setItem("combos", JSON.stringify(filteredCombos));
  }

  useEffect(() => {
    loadCombos();
  }, []);

  return (
    <main>
      <div style={{textAlign: "center", marginTop: "5%"}}>
        <h1>Martin Cahyadi</h1>
        <h2>535240069</h2>
        <p>Combo List</p>
      </div>
      <div className="buttonSection text-center displa-flex">
        <Link href="/create"><Button text="Add a Combo" /></Link>
        <Link href="/explore"><Button text="Cool Fighting Games" /></Link>
      </div>
      <div className="tableSection">
        {combos.length === 0 ? (<p>No Combos Yet.</p>):
          <table className="table table-striped">
          <thead style={{textAlign: "center"}}>
            <tr>
              <th>Title</th>
              <th>Notation</th>
              <th>Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{textAlign: "center"}}>
            {combos.map((combo) => (
              <tr key={combo.id}>
                <th>{combo.title}</th>
                <th>{combo.notation}</th>
                <th>{combo.date}</th>
                <th><Link href={`/edit/${combo.id}`}><Button text="Edit" /></Link></th>
                <th onClick={() => handleDelete(combo.id)}><Button text="Delete" /></th>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
    </main>
  );
}
