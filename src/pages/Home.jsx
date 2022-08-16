import AddTutorial from '../components/AddTutorial';
import TutorialList from '../components/TutorialList';
import axios from 'axios'; // axios'tan axios'u import etmemiz gerekiyor.
import { useState, useEffect } from 'react';

const Home = () => {
  const [tutorials, setTutorials] = useState();

  const url = 'https://axios-example-cw.herokuapp.com/api/tutorials';
  // Veri cekecegimiz API'nin adresi.

  //! GET (Read)
  const getTutorials = async () => {
    try {
      const { data } = await axios.get(url);
      // await kullanmak icin bu fonksiyonun async olmasi lazim.
      // veriler data denilen bir objenin icerisinde gelir. bu axios'un kendi özelligidir. bu objeden kurtulmak icin destructuring yapariz.
      setTutorials(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTutorials();
  }, []);

  //! POST (Create)
  const addTutorial = async (tutorial) => {
    try {
      await axios.post(url, tutorial);
      // axios'un post islemi parantez icine 2 parametre alir.
      // ilki post islemini yapmak istedigimiz url, ikincisi göndermek istedigimiz veri. 
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };

  //! DELETE (delete)
  const deleteTutorial = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      // API'ler silme islemini genellikle id'ye göre yaparlar.
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };

  //! Update (PUT:Whole Update,PATCH :Partially Update)
  const editTutorial = async (id, title, desc) => {
    //! Bu kisma gerek yok aslinda degistirmek istedigimiz
    //! veriler alt componentten geliyor. Dolayısiyla
    //! dogurdan axios istegini gonderebiliriz
    // const filtered = tutorials
    //   .filter((tutor) => tutor.id === id)
    //   .map((item) => ({ title: title, description: desc }));

    // console.log(filtered);
    try {
      await axios.put(`${url}/${id}`, { title, description: desc });
    } catch (error) {
      console.log(error);
    }
    getTutorials();
  };

  return (
    <>
      <AddTutorial addTutorial={addTutorial} />
      <TutorialList
        tutorials={tutorials}
        deleteTutorial={deleteTutorial}
        editTutorial={editTutorial}
      />
    </>
  );
};

export default Home;
