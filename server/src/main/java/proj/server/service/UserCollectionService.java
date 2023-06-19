package proj.server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proj.server.model.Restaurant;
import proj.server.model.UserCollection;
import proj.server.repository.UserCollectionRepository;

@Service
public class UserCollectionService {

    @Autowired
    private UserCollectionRepository repo;
    
    public void saveCollections(UserCollection[] collections,String userId){

        //for each collection
        for (UserCollection c : collections) {
            
            repo.insertIntoCollectionTable(c,userId);
        
            repo.insertIntoResTable(c.getRestaurants());

            for (Restaurant r : c.getRestaurants()) {
                
                repo.insertIntoColResTable(c.getColId(), r.getPlaceId());
            }

        }

    }

    public Optional<List<UserCollection>> retrieveCollections(String id){

       return repo.getCollectionByAccId(id);
    }
}
