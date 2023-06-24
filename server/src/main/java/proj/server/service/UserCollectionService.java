package proj.server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import proj.server.model.Restaurant;
import proj.server.model.UserCollection;
import proj.server.repository.UserCollectionRepository;

@Service
public class UserCollectionService {

    @Autowired
    private UserCollectionRepository repo;
    
    @Transactional
    public Boolean saveCollections(UserCollection[] collections,String userId){

        try{
            repo.deletePreviousRecordsByID(userId);

            //for each collection
            for (UserCollection c : collections) {
                
                repo.insertIntoCollectionTable(c,userId);
            
                repo.insertIntoResTable(c.getRestaurants());

                for (Restaurant r : c.getRestaurants()) {
                    
                    repo.insertIntoColResTable(c.getColId(), r.getPlaceId());
                }

            }
            return true;
            
        }catch(Exception e){
            e.printStackTrace();
            return false;
        }

    }

    public Optional<List<UserCollection>> retrieveCollections(String id){

       return repo.getCollectionByAccId(id);
    }
}
