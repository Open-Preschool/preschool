import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Button, ListItem } from 'react-native-elements';
import { supabase } from '../lib/supabase';
import { ApolloConsumer } from '@apollo/client';
import {
  ClassroomAddedDocument,
  useClassroomsQuery,
  useRemoveClassroomMutation,
  ClassroomsDocument,
} from '../graphql';
import { ScrollView } from 'react-native-gesture-handler';

export default function TabTwoScreen() {
  const { subscribeToMore, data, loading, error } = useClassroomsQuery();
  const [removeClassroom] = useRemoveClassroomMutation({
    refetchQueries: [ClassroomsDocument],
  });

  React.useEffect(() => {
    subscribeToMore({
      document: ClassroomAddedDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        // TODO: fix the subscription naming. Subscription and query data have to be
        //   the same name for TS types
        const newFeedItem = subscriptionData.data.classrooms;

        const ret = Object.assign({}, prev, {
          classrooms: [...prev.classrooms, newFeedItem],
        });
        return ret;
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classroom</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <ScrollView>
        {data?.classrooms.map((e) => {
          return (
            <ListItem.Swipeable
              key={e.id}
              bottomDivider
              leftContent={
                <Button
                  title="Delete"
                  icon={{ name: 'delete', color: 'white' }}
                  buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                  onPress={() =>
                    removeClassroom({ variables: { removeClassroomId: e.id } })
                  }
                />
              }
              rightContent={
                <Button
                  title="Delete"
                  icon={{ name: 'delete', color: 'white' }}
                  buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                  onPress={() =>
                    removeClassroom({ variables: { removeClassroomId: e.id } })
                  }
                />
              }
            >
              <ListItem.Content>
                <ListItem.Title>{e.name} </ListItem.Title>
                <ListItem.Subtitle>
                  {e.lessons.length} Lessons
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem.Swipeable>
          );
        })}
      </ScrollView>

      <ApolloConsumer>
        {(client) => {
          return (
            <Button
              title="Sign Out"
              onPress={async () => {
                await supabase.auth.signOut();
                await client.resetStore();
              }}
            />
          );
        }}
      </ApolloConsumer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
