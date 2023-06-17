package proj.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import proj.server.model.Restaurant;
import proj.server.model.UserCollection;
import proj.server.repository.UserCollectionRepository;

@Service
public class UserCollectionService {

    @Autowired
    private UserCollectionRepository repo;
    
    public void saveCollections(UserCollection[] collections){

        //for each collection
        for (UserCollection c : collections) {
            
            repo.insertIntoCollectionTable(c);
        
            repo.insertIntoResTable(c.getRestaurants());

            for (Restaurant r : c.getRestaurants()) {
                
                repo.insertIntoColResTable(c.getColId(), r.getPlaceId());
            }

        }

    }
}
