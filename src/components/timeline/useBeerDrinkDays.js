import { useMemo, useCallback } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { useObjectVal } from 'react-firebase-hooks/database';
import { isSameDay } from 'date-fns';

export function useBeerDrinkDays() {
  const [beerDrinkDays, isLoading] = useObjectVal(
    firebase.database().ref('beerDrinkDays')
  );
  const database = useMemo(() => firebase?.database(), [firebase]);
  const ref = useMemo(() => database?.ref('beerDrinkDays'), [database]);

  const handleAddDay = useCallback(
    day => {
      const date = Number(day) || Date.now();

      if (database && !beerDrinkDays?.some(day => isSameDay(day, date))) {
        beerDrinkDays?.length > 0
          ? database.ref().update({ beerDrinkDays: [...beerDrinkDays, date] })
          : database.ref('beerDrinkDays').set([date]);
      }
    },
    [database, beerDrinkDays]
  );

  return { beerDrinkDays, isLoading, database, ref, handleAddDay };
}
