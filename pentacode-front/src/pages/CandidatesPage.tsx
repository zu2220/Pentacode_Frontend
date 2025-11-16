import { useEffect, useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import CandidateGrid from '../components/CandidateGrid';
//import { mockCandidates } from '../data/mockCandidates';
import { getCandidatos } from '../api/candidatos';

export default function CandidatesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [candidatos, setCandidatos] = useState([]);
  const totalPages = Math.ceil(candidatos.length / 9);


  useEffect(()=>{
    //llamamos a la funcion que hace fetch a los candidatos
    const fetchCandidatos = async () => {
      try {
        const response = await getCandidatos();
        setCandidatos(response.data);
      } catch (error) {
        console.error("Error fetching candidatos:", error);
      }
    };
    fetchCandidatos();
  },[])
  //alert("Candidatos: "+JSON.stringify(candidatos));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <FilterSidebar />
        <CandidateGrid
          candidates={candidatos}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  );
}
