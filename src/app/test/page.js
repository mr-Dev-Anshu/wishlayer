'use client'
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

const PincodeSubmission = () => {
  const [loading, setLoading] = useState(false);

   const pincodeData = [
    { "pincode": "226008", "location": "32 Bn. pac" },
    { "pincode": "226004", "location": "A N l colony" },
    { "pincode": "226001", "location": "A P sabha" },
    { "pincode": "227308", "location": "Adampur Janubi" },
    { "pincode": "226005", "location": "Adarsh Nagar" },
    { "pincode": "226005", "location": "Ain" },
    { "pincode": "226004", "location": "Aishbagh" },
    { "pincode": "227005", "location": "Akariakalan" },
    { "pincode": "226005", "location": "Alambagh" },
    { "pincode": "226017", "location": "Alamnagar" },
    { "pincode": "226024", "location": "Aliganj" },
    { "pincode": "226024", "location": "Aliganj Extension" },
    { "pincode": "227005", "location": "Amaniganj" },
    { "pincode": "226008", "location": "Amausi" },
    { "pincode": "226009", "location": "Amausi Ad" },
    { "pincode": "226003", "location": "Amberganj" },
    { "pincode": "227125", "location": "Amethi" },
    { "pincode": "227107", "location": "Amethia Salempur" },
    { "pincode": "226018", "location": "Aminabad Park" },
    { "pincode": "227105", "location": "Amraigaon" },
    { "pincode": "226005", "location": "Anandnagar" },
    { "pincode": "227105", "location": "Anaura Kalan" },
    { "pincode": "227115", "location": "Antagarhi" },
    { "pincode": "226002", "location": "Arjunganj" },
    { "pincode": "227005", "location": "Arjunpur" },
    { "pincode": "226004", "location": "Arya Nagar" },
    { "pincode": "227202", "location": "Asti" },
    { "pincode": "227115", "location": "Atari" },
    { "pincode": "227005", "location": "Ateswa" },
    { "pincode": "227101", "location": "Aurawan" },
    { "pincode": "226017", "location": "Avas Vikas colony" },
    { "pincode": "226001", "location": "B Hotel" },
    { "pincode": "226025", "location": "B R a university" },
    { "pincode": "227115", "location": "Badiyan" },
    { "pincode": "227005", "location": "Bahargaon" },
    { "pincode": "227308", "location": "Bahrauli" },
    { "pincode": "227107", "location": "Bahroo" },
    { "pincode": "226002", "location": "Bakkash" },
    { "pincode": "227202", "location": "Bakshi Ka talab" },
    { "pincode": "227101", "location": "Bani" },
    { "pincode": "227101", "location": "Banthra" },
    { "pincode": "227107", "location": "Baragaon" },
    { "pincode": "226002", "location": "Barauna" },
    { "pincode": "227107", "location": "Barawan Kalan" },
    { "pincode": "226005", "location": "Barha" },
    { "pincode": "227305", "location": "Barwalia" },
    { "pincode": "226026", "location": "Basha" },
    { "pincode": "226021", "location": "Batha Sabauli" },
    { "pincode": "227202", "location": "Baurumau" },
    { "pincode": "227115", "location": "Bazargaron" },
    { "pincode": "227115", "location": "Beerpur" },
    { "pincode": "227125", "location": "Begariamau" },
    { "pincode": "226026", "location": "Behta" },
    { "pincode": "226005", "location": "Benti" },
    { "pincode": "227305", "location": "Bhadeswa" },
    { "pincode": "226002", "location": "Bhadrukh" },
    { "pincode": "227111", "location": "Bhadwana" },
    { "pincode": "227115", "location": "Bhagwantpur" },
    { "pincode": "227115", "location": "Bharwara" },
    { "pincode": "226005", "location": "Bhatgaon" },
    { "pincode": "227202", "location": "Bhauli" },
    { "pincode": "227305", "location": "Bhilampur" },
    { "pincode": "227005", "location": "Bibipur" },
    { "pincode": "226002", "location": "Bijnaur" },
    { "pincode": "226004", "location": "Birhana" },
    { "pincode": "226004", "location": "Blunt Square" },
    { "pincode": "226002", "location": "C B lines" },
    { "pincode": "226012", "location": "C E school" },
    { "pincode": "226005", "location": "C&w work shop" },
    { "pincode": "226001", "location": "Canal Colony" },
    { "pincode": "226002", "location": "Chakganjaria" },
    { "pincode": "226024", "location": "Chandganj" },
    { "pincode": "226002", "location": "Chandrawal" },
    { "pincode": "226004", "location": "Charbagh" },
    { "pincode": "227308", "location": "Chatauni" },
    { "pincode": "226003", "location": "Chaupatiyan" },
    { "pincode": "227105", "location": "Chinhat" },
    { "pincode": "226015", "location": "Cimap" },
    { "pincode": "226020", "location": "D M road" },
    { "pincode": "226002", "location": "D S bazar" },
    { "pincode": "226020", "location": "Daliganj" },
    { "pincode": "226001", "location": "Darul Safa" },
    { "pincode": "227116", "location": "Daulatpur" },
    { "pincode": "227309", "location": "Dayalpur" },
    { "pincode": "227305", "location": "Deoti" },
    { "pincode": "227111", "location": "Dhendhemau" },
    { "pincode": "226020", "location": "Diguria" },
    { "pincode": "227111", "location": "Dilawarnagar" },
    { "pincode": "226002", "location": "Dilkusha" },
    { "pincode": "226005", "location": "Distt. jail" },
    { "pincode": "227107", "location": "Dona" },
    { "pincode": "227207", "location": "Fftc Indaurabagh" },
    { "pincode": "227115", "location": "Gahdon" },
    { "pincode": "226018", "location": "Ganesh Ganj" },
    { "pincode": "227101", "location": "Garhi Chunauti" },
    { "pincode": "227116", "location": "Gaunda" },
    { "pincode": "226021", "location": "Gayrtinagar" },
    { "pincode": "226020", "location": "Ghaila" },
    { "pincode": "226016", "location": "Ghazipur" },
    { "pincode": "227107", "location": "Gohramau" },
    { "pincode": "227105", "location": "Goila" },
    { "pincode": "226001", "location": "Gokhley Marg" },
    { "pincode": "226018", "location": "Golaganj" },
    { "pincode": "226010", "location": "Gomtinagar" },
    { "pincode": "226010", "location": "Gomtinagar Vistar" },
    { "pincode": "227115", "location": "Gopramau" },
    { "pincode": "227125", "location": "Gosainganj" },
    { "pincode": "226026", "location": "Guramba" },
    { "pincode": "226004", "location": "Gurdwara" },
    { "pincode": "226001", "location": "H C bench" },
    { "pincode": "226006", "location": "H E school" },
    { "pincode": "226016", "location": "Hal" },
    { "pincode": "226005", "location": "Harauni" },
    { "pincode": "226002", "location": "Hasanpur Keoli" },
    { "pincode": "226003", "location": "Hasnain Market" },
    { "pincode": "227125", "location": "Hasnapur" },
    { "pincode": "226003", "location": "Husainabad" },
    { "pincode": "226013", "location": "Iim Mubarakpur" },
    { "pincode": "226008", "location": "Ind.Area sarojininagar" },
    { "pincode": "227005", "location": "Indara" },
    { "pincode": "226016", "location": "Indira Nagar" },
    { "pincode": "227105", "location": "Industria Area chinhat" },
    { "pincode": "226009", "location": "Industrial Area" },
    { "pincode": "226008", "location": "Int Gaon" },
    { "pincode": "226010", "location": "Ismailganj" },
    { "pincode": "227005", "location": "Itaunja" },
    { "pincode": "227305", "location": "Jabrauli" },
    { "pincode": "227202", "location": "Jagdishpur" },
    { "pincode": "227305", "location": "Jaitikhera" },
    { "pincode": "227005", "location": "Jamkhanwa" },
    { "pincode": "227116", "location": "Jamolia" },
    { "pincode": "226001", "location": "Jawahar Bhawan" },
    { "pincode": "227116", "location": "Jindaur" },
    { "pincode": "227105", "location": "Juggaur" },
    { "pincode": "227111", "location": "Kahla" },
    { "pincode": "227107", "location": "Kakori" },
    { "pincode": "227111", "location": "Kakrabad" },
    { "pincode": "227305", "location": "Kalli Pacchim" },
    { "pincode": "226022", "location": "Kalyanpur" },
    { "pincode": "227202", "location": "Kamlabad Badauli" },
    { "pincode": "227305", "location": "Kankaha" }
  ]
  

  const handleSubmit = async () => {
    setLoading(true);
    const pincodesCollection = collection(db, "availablity");

    try {
      for (const pincode of pincodeData) {
        await addDoc(pincodesCollection, pincode);
      }
      alert("Pincode data saved successfully!");
    } catch (error) {
      console.log("Error saving pincode data: ", error);
      // alert("Failed to save pincode data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Pincode Data Submission</h1>
      <button
        // onClick={handleSubmit}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${loading && "opacity-50 cursor-not-allowed"}`}
        disabled={loading}
      >
        {loading ? "Saving..." : "Submit Pincode Data"}
      </button>
    </div>
  );
};

export default PincodeSubmission;
