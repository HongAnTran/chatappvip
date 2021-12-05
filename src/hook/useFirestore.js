import React from "react";
import { db } from "../Filebase/config";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const useFirestore = (collectionS, condition) => {
  const [document, setDocument] = React.useState([]);

  React.useEffect(() => {
    let collectionRef = query(
      collection(db, collectionS),
      orderBy("createdAt")
    );

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      collectionRef = query(
        collectionRef,
        where(condition.fieldName, condition.operator, condition.compareValue)
      );
    }

    const unsub = onSnapshot(collectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocument(data);
    });

    return unsub;
  }, [collectionS, condition]);

  return document;
};

export default useFirestore;
