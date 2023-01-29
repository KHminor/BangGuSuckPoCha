package com.server.back.dto.item;

import com.server.back.domain.item.Item;
import com.server.back.domain.review.Review;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ApiModel(value = "ItemResponseDto")
public class ItemResponseDto {
   private Long userId;
   private Long itemId;
   private String itemName;
   private String itemDetail;
   private Integer itemType;

   public ItemResponseDto(Item i) {
      this.itemId = i.getItemId();
      this.itemName = i.getItemName();
      this.itemDetail = i.getItemDetail();
      this.itemType = i.getItemType();
   }
}
